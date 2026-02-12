package com.smartapp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.smartapp.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_menu")
public class SysMenu extends BaseEntity {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String menuName;

    private Long parentId;

    private Integer sort;

    private String path;

    private String component;

    private String icon;

    private String menuType;

    private String visible;

    private String perms;

    private Integer status;
}
