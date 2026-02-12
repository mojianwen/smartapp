package com.smartapp.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.smartapp.dto.LoginDTO;
import com.smartapp.dto.LoginVO;
import com.smartapp.entity.SysUser;
import com.smartapp.entity.SysUserRole;
import com.smartapp.exception.BusinessException;
import com.smartapp.mapper.SysMenuMapper;
import com.smartapp.mapper.SysUserMapper;
import com.smartapp.mapper.SysUserRoleMapper;
import com.smartapp.security.JwtUtils;
import com.smartapp.service.SysUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SysUserServiceImpl implements SysUserService {

    private final SysUserMapper userMapper;
    private final SysUserRoleMapper userRoleMapper;
    private final SysMenuMapper menuMapper;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    @Override
    public LoginVO login(LoginDTO dto) {
        SysUser user = getByUsername(dto.getUsername());
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        if (user.getStatus() != 0) {
            throw new BusinessException("用户已被禁用");
        }
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BusinessException("密码错误");
        }
        
        String token = jwtUtils.generateToken(user.getId(), user.getUsername());
        
        LoginVO vo = new LoginVO();
        vo.setToken(token);
        vo.setUserId(user.getId());
        vo.setUsername(user.getUsername());
        vo.setNickname(user.getNickname());
        vo.setAvatar(user.getAvatar());
        return vo;
    }

    @Override
    public SysUser getByUsername(String username) {
        return userMapper.selectOne(
            new LambdaQueryWrapper<SysUser>().eq(SysUser::getUsername, username)
        );
    }

    @Override
    public SysUser getById(Long id) {
        return userMapper.selectById(id);
    }

    @Override
    public List<SysUser> list() {
        return userMapper.selectList(null);
    }

    @Override
    public boolean save(SysUser user) {
        user.setId(null); // 确保新增时id为null，让数据库自增
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus(0);
        return userMapper.insert(user) > 0;
    }

    @Override
    public boolean updateById(SysUser user) {
        return userMapper.updateById(user) > 0;
    }

    @Override
    public boolean removeById(Long id) {
        return userMapper.deleteById(id) > 0;
    }

    @Override
    public List<Long> getMenuIdsByUserId(Long userId) {
        return userMapper.selectMenuIdsByUserId(userId);
    }

    @Override
    @Transactional
    public void assignRoles(Long userId, List<Long> roleIds) {
        userRoleMapper.delete(
            new LambdaQueryWrapper<SysUserRole>().eq(SysUserRole::getUserId, userId)
        );
        if (roleIds != null && !roleIds.isEmpty()) {
            for (Long roleId : roleIds) {
                SysUserRole ur = new SysUserRole();
                ur.setUserId(userId);
                ur.setRoleId(roleId);
                userRoleMapper.insert(ur);
            }
        }
    }

    @Override
    public List<Long> getRoleIdsByUserId(Long userId) {
        List<SysUserRole> list = userRoleMapper.selectList(
            new LambdaQueryWrapper<SysUserRole>().eq(SysUserRole::getUserId, userId)
        );
        return list.stream().map(SysUserRole::getRoleId).collect(Collectors.toList());
    }

    @Override
    public void resetPassword(Long userId) {
        SysUser user = new SysUser();
        user.setId(userId);
        user.setPassword(passwordEncoder.encode("123456"));
        userMapper.updateById(user);
    }
}
