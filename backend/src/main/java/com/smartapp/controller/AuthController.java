package com.smartapp.controller;

import com.smartapp.common.Result;
import com.smartapp.dto.LoginDTO;
import com.smartapp.dto.LoginVO;
import com.smartapp.dto.MenuTreeVO;
import com.smartapp.entity.SysUser;
import com.smartapp.security.JwtUtils;
import com.smartapp.service.SysMenuService;
import com.smartapp.service.SysUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final SysUserService userService;
    private final SysMenuService menuService;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public Result<LoginVO> login(@Valid @RequestBody LoginDTO dto) {
        LoginVO vo = userService.login(dto);
        return Result.success(vo);
    }

    @GetMapping("/info")
    public Result<Map<String, Object>> getUserInfo(@AuthenticationPrincipal SysUser user) {
        Map<String, Object> info = new HashMap<>();
        info.put("user", user);
        List<MenuTreeVO> menus = menuService.getMenuTreeByUserId(user.getId());
        info.put("menus", menus);
        List<Long> permissions = userService.getMenuIdsByUserId(user.getId());
        info.put("permissions", permissions);
        return Result.success(info);
    }

    @PostMapping("/logout")
    public Result<Void> logout() {
        return Result.success();
    }
}
