<template>
  <div class="user-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增用户
          </el-button>
        </div>
      </template>
      
      <el-table :data="userList" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="nickname" label="昵称" width="120" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 0 ? 'success' : 'danger'">
              {{ row.status === 0 ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" fixed="right" width="280">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="warning" size="small" @click="handleAssignRole(row)">分配角色</el-button>
            <el-button type="info" size="small" @click="handleResetPwd(row)">重置密码</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="isEdit" />
        </el-form-item>
        <el-form-item v-if="!isEdit" label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :value="0">正常</el-radio>
            <el-radio :value="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="roleDialogVisible" title="分配角色" width="400px">
      <el-checkbox-group v-model="selectedRoles">
        <el-checkbox v-for="role in roleList" :key="role.id" :value="role.id">
          {{ role.roleName }}
        </el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <el-button @click="roleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAssignRoleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserList, createUser, updateUser, deleteUser, assignRoles, getUserRoles, resetPassword } from '@/api/user'
import { getRoleList } from '@/api/role'

const userList = ref([])
const roleList = ref([])
const dialogVisible = ref(false)
const roleDialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)
const formRef = ref()
const currentUserId = ref(null)
const selectedRoles = ref([])

const form = reactive({
  username: '',
  password: '',
  nickname: '',
  email: '',
  phone: '',
  status: 0
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
}

const loadData = async () => {
  try {
    const res = await getUserList()
    userList.value = res.data || []
  } catch (error) {
    console.error(error)
  }
}

const loadRoles = async () => {
  try {
    const res = await getRoleList()
    roleList.value = res.data || []
  } catch (error) {
    console.error(error)
  }
}

const handleAdd = () => {
  dialogTitle.value = '新增用户'
  isEdit.value = false
  currentUserId.value = null
  Object.assign(form, { username: '', password: '', nickname: '', email: '', phone: '', status: 0 })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑用户'
  isEdit.value = true
  currentUserId.value = row.id
  Object.assign(form, { ...row, password: '' })
  dialogVisible.value = true
}

const handleSubmit = async () => {
  await formRef.value.validate()
  try {
    if (isEdit.value) {
      await updateUser({ ...form, id: currentUserId.value })
      ElMessage.success('修改成功')
    } else {
      // 新增时只传递需要的字段，不包含id
      const { id, ...userData } = form
      await createUser(userData)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    loadData()
  } catch (error) {
    console.error(error)
  }
}

const handleDelete = async (row) => {
  await ElMessageBox.confirm('确定要删除该用户吗？', '提示', { type: 'warning' })
  try {
    await deleteUser(row.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (error) {
    console.error(error)
  }
}

const handleAssignRole = async (row) => {
  currentUserId.value = row.id
  selectedRoles.value = []
  // 加载用户当前的角色
  try {
    const res = await getUserRoles(row.id)
    selectedRoles.value = res.data || []
  } catch (error) {
    console.error('加载用户角色失败:', error)
  }
  roleDialogVisible.value = true
}

const handleAssignRoleSubmit = async () => {
  try {
    await assignRoles(currentUserId.value, selectedRoles.value)
    ElMessage.success('分配成功')
    roleDialogVisible.value = false
  } catch (error) {
    console.error(error)
  }
}

const handleResetPwd = async (row) => {
  await ElMessageBox.confirm('确定要重置该用户的密码吗？密码将重置为 123456', '提示', { type: 'warning' })
  try {
    await resetPassword(row.id)
    ElMessage.success('密码已重置为 123456')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadData()
  loadRoles()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
