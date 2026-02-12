package com.smartapp.service;

import com.smartapp.entity.SysRole;

import java.util.List;

public interface SysRoleService {

    List<SysRole> list();

    SysRole getById(Long id);

    boolean save(SysRole role);

    boolean updateById(SysRole role);

    boolean removeById(Long id);

    void assignMenus(Long roleId, List<Long> menuIds);

    List<Long> getMenuIdsByRoleId(Long roleId);
}
