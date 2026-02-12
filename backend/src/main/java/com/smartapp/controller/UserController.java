package com.smartapp.controller;

import com.smartapp.common.Result;
import com.smartapp.entity.SysUser;
import com.smartapp.service.SysUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/system/user")
@RequiredArgsConstructor
public class UserController {

    private final SysUserService userService;

    @GetMapping("/list")
    public Result<List<SysUser>> list() {
        return Result.success(userService.list());
    }

    @GetMapping("/{id}")
    public Result<SysUser> getById(@PathVariable Long id) {
        return Result.success(userService.getById(id));
    }

    @PostMapping
    public Result<Boolean> save(@RequestBody SysUser user) {
        return Result.success(userService.save(user));
    }

    @PutMapping
    public Result<Boolean> update(@RequestBody SysUser user) {
        return Result.success(userService.updateById(user));
    }

    @DeleteMapping("/{id}")
    public Result<Boolean> delete(@PathVariable Long id) {
        return Result.success(userService.removeById(id));
    }

    @GetMapping("/{id}/roles")
    public Result<List<Long>> getUserRoles(@PathVariable Long id) {
        return Result.success(userService.getRoleIdsByUserId(id));
    }

    @PostMapping("/{id}/roles")
    public Result<Void> assignRoles(@PathVariable Long id, @RequestBody List<Long> roleIds) {
        userService.assignRoles(id, roleIds);
        return Result.success();
    }

    @PostMapping("/{id}/reset-password")
    public Result<Void> resetPassword(@PathVariable Long id) {
        userService.resetPassword(id);
        return Result.success();
    }
}
