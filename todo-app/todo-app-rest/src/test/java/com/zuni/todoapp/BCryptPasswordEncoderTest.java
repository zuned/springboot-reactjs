package com.zuni.todoapp;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptPasswordEncoderTest {

    @Test
    void passwordTest() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("Encoded String : "+ encoder.encode("ahmed"));
    }

}
