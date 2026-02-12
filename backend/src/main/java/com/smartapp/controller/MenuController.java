package com.smartapp.controller;

import com.smartapp.common.Result;
import com.smartapp.dto.MenuTreeVO;
import com.smartapp.entity.SysMenu;
import com.smartapp.service.SysMenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/system/menu")
@RequiredArgsConstructor
public class MenuController {

    private final SysMenuService menuService;

    @GetMapping("/tree")
    public Result<List<MenuTreeVO>> getMenuTree() {
        return Result.success(menuService.getMenuTree());
    }

    @GetMapping("/list")
    public Result<List<SysMenu>> list() {
        return Result.success(menuService.list());
    }

    @GetMapping("/{id}")
    public Result<SysMenu> getById(@PathVariable Long id) {
        return Result.success(menuService.getById(id));
    }

    @PostMapping
    public Result<Boolean> save(@RequestBody SysMenu menu) {
        return Result.success(menuService.save(menu));
    }

    @PutMapping
    public Result<Boolean> update(@RequestBody SysMenu menu) {
        return Result.success(menuService.updateById(menu));
    }

    @DeleteMapping("/{id}")
    public Result<Boolean> delete(@PathVariable Long id) {
        return Result.success(menuService.removeById(id));
    }
}
