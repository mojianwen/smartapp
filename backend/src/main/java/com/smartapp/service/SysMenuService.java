package com.smartapp.service;

import com.smartapp.dto.MenuTreeVO;
import com.smartapp.entity.SysMenu;

import java.util.List;

public interface SysMenuService {

    List<MenuTreeVO> getMenuTree();

    List<MenuTreeVO> getMenuTreeByUserId(Long userId);

    List<SysMenu> list();

    SysMenu getById(Long id);

    boolean save(SysMenu menu);

    boolean updateById(SysMenu menu);

    boolean removeById(Long id);
}
