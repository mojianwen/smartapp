package com.smartapp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.smartapp.entity.SysUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {

    List<Long> selectMenuIdsByUserId(Long userId);
}
