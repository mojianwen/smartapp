package com.smartapp.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.smartapp.entity.SysRole;
import com.smartapp.entity.SysRoleMenu;
import com.smartapp.mapper.SysRoleMapper;
import com.smartapp.mapper.SysRoleMenuMapper;
import com.smartapp.service.SysRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SysRoleServiceImpl implements SysRoleService {

    private final SysRoleMapper roleMapper;
    private final SysRoleMenuMapper roleMenuMapper;

    @Override
    public List<SysRole> list() {
        return roleMapper.selectList(null);
    }

    @Override
    public SysRole getById(Long id) {
        return roleMapper.selectById(id);
    }

    @Override
    public boolean save(SysRole role) {
        return roleMapper.insert(role) > 0;
    }

    @Override
    public boolean updateById(SysRole role) {
        return roleMapper.updateById(role) > 0;
    }

    @Override
    public boolean removeById(Long id) {
        return roleMapper.deleteById(id) > 0;
    }

    @Override
    @Transactional
    public void assignMenus(Long roleId, List<Long> menuIds) {
        roleMenuMapper.delete(
            new LambdaQueryWrapper<SysRoleMenu>().eq(SysRoleMenu::getRoleId, roleId)
        );
        if (menuIds != null && !menuIds.isEmpty()) {
            for (Long menuId : menuIds) {
                SysRoleMenu rm = new SysRoleMenu();
                rm.setRoleId(roleId);
                rm.setMenuId(menuId);
                roleMenuMapper.insert(rm);
            }
        }
    }

    @Override
    public List<Long> getMenuIdsByRoleId(Long roleId) {
        List<SysRoleMenu> list = roleMenuMapper.selectList(
            new LambdaQueryWrapper<SysRoleMenu>().eq(SysRoleMenu::getRoleId, roleId)
        );
        return list.stream().map(SysRoleMenu::getMenuId).collect(Collectors.toList());
    }
}
