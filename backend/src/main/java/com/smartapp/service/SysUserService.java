package com.smartapp.service;

import com.smartapp.dto.LoginDTO;
import com.smartapp.dto.LoginVO;
import com.smartapp.entity.SysUser;

import java.util.List;

public interface SysUserService {

    LoginVO login(LoginDTO dto);

    SysUser getByUsername(String username);

    SysUser getById(Long id);

    List<SysUser> list();

    boolean save(SysUser user);

    boolean updateById(SysUser user);

    boolean removeById(Long id);

    List<Long> getMenuIdsByUserId(Long userId);

    void assignRoles(Long userId, List<Long> roleIds);

    List<Long> getRoleIdsByUserId(Long userId);

    void resetPassword(Long userId);
}
