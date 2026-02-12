package com.smartapp.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

@Data
@TableName("sys_role_menu")
public class SysRoleMenu {

    @TableId(type = IdType.NONE)
    private Long roleId;

    private Long menuId;
}
