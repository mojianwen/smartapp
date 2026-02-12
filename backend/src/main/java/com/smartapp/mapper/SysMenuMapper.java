package com.smartapp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.smartapp.entity.SysMenu;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SysMenuMapper extends BaseMapper<SysMenu> {

    List<SysMenu> selectMenusByUserId(Long userId);
}
