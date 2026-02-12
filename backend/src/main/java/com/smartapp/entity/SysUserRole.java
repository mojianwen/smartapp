package com.smartapp.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

@Data
@TableName("sys_user_role")
public class SysUserRole {

    @TableId(type = IdType.NONE)
    private Long userId;

    private Long roleId;
}
