package com.smartapp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("sys_role_menu")
public class SysRoleMenu {

    @TableField(value = "role_id")
    private Long roleId;

    @TableField(value = "menu_id")
    private Long menuId;
}
