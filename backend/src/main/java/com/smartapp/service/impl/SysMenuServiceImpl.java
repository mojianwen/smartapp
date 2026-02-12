package com.smartapp.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.smartapp.dto.MenuTreeVO;
import com.smartapp.entity.SysMenu;
import com.smartapp.mapper.SysMenuMapper;
import com.smartapp.service.SysMenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SysMenuServiceImpl implements SysMenuService {

    private final SysMenuMapper menuMapper;

    @Override
    public List<MenuTreeVO> getMenuTree() {
        List<SysMenu> menus = menuMapper.selectList(
            new LambdaQueryWrapper<SysMenu>().orderByAsc(SysMenu::getSort)
        );
        return buildTree(menus, 0L);
    }

    @Override
    public List<MenuTreeVO> getMenuTreeByUserId(Long userId) {
        List<SysMenu> menus = menuMapper.selectMenusByUserId(userId);
        return buildTree(menus, 0L);
    }

    @Override
    public List<SysMenu> list() {
        return menuMapper.selectList(
            new LambdaQueryWrapper<SysMenu>().orderByAsc(SysMenu::getSort)
        );
    }

    @Override
    public SysMenu getById(Long id) {
        return menuMapper.selectById(id);
    }

    @Override
    public boolean save(SysMenu menu) {
        return menuMapper.insert(menu) > 0;
    }

    @Override
    public boolean updateById(SysMenu menu) {
        return menuMapper.updateById(menu) > 0;
    }

    @Override
    public boolean removeById(Long id) {
        return menuMapper.deleteById(id) > 0;
    }

    private List<MenuTreeVO> buildTree(List<SysMenu> menus, Long parentId) {
        List<MenuTreeVO> result = new ArrayList<>();
        Map<Long, List<SysMenu>> groupMap = menus.stream()
            .collect(Collectors.groupingBy(SysMenu::getParentId));
        
        List<SysMenu> children = groupMap.get(parentId);
        if (children == null) {
            return result;
        }
        
        for (SysMenu menu : children) {
            MenuTreeVO vo = MenuTreeVO.fromEntity(menu);
            vo.setChildren(buildTree(menus, menu.getId()));
            result.add(vo);
        }
        return result;
    }
}
