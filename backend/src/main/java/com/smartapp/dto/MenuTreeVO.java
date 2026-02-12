package com.smartapp.dto;

import com.smartapp.entity.SysMenu;
import lombok.Data;

import java.util.List;

@Data
public class MenuTreeVO {

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
    private List<MenuTreeVO> children;

    public static MenuTreeVO fromEntity(SysMenu menu) {
        MenuTreeVO vo = new MenuTreeVO();
        vo.setId(menu.getId());
        vo.setMenuName(menu.getMenuName());
        vo.setParentId(menu.getParentId());
        vo.setSort(menu.getSort());
        vo.setPath(menu.getPath());
        vo.setComponent(menu.getComponent());
        vo.setIcon(menu.getIcon());
        vo.setMenuType(menu.getMenuType());
        vo.setVisible(menu.getVisible());
        vo.setPerms(menu.getPerms());
        vo.setStatus(menu.getStatus());
        return vo;
    }
}
