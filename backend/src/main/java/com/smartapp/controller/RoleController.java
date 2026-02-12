package com.smartapp.controller;

import com.smartapp.common.Result;
import com.smartapp.entity.SysRole;
import com.smartapp.service.SysRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/system/role")
@RequiredArgsConstructor
public class RoleController {

    private final SysRoleService roleService;

    @GetMapping("/list")
    public Result<List<SysRole>> list() {
        return Result.success(roleService.list());
    }

    @GetMapping("/{id}")
    public Result<SysRole> getById(@PathVariable Long id) {
        return Result.success(roleService.getById(id));
    }

    @PostMapping
    public Result<Boolean> save(@RequestBody SysRole role) {
        return Result.success(roleService.save(role));
    }

    @PutMapping
    public Result<Boolean> update(@RequestBody SysRole role) {
        return Result.success(roleService.updateById(role));
    }

    @DeleteMapping("/{id}")
    public Result<Boolean> delete(@PathVariable Long id) {
        return Result.success(roleService.removeById(id));
    }

    @PostMapping("/{id}/menus")
    public Result<Void> assignMenus(@PathVariable Long id, @RequestBody List<Long> menuIds) {
        roleService.assignMenus(id, menuIds);
        return Result.success();
    }

    @GetMapping("/{id}/menus")
    public Result<List<Long>> getMenuIds(@PathVariable Long id) {
        return Result.success(roleService.getMenuIdsByRoleId(id));
    }
}
