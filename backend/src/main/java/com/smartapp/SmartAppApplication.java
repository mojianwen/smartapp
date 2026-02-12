package com.smartapp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.smartapp.mapper")
public class SmartAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartAppApplication.class, args);
    }
}
