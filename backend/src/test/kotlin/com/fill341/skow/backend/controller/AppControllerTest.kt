package com.fill341.skow.backend.controller

import junit.framework.Assert.assertEquals
import junit.framework.Assert.assertNotNull
import org.json.JSONObject
import org.junit.Test
import org.junit.runner.RunWith
import org.slf4j.LoggerFactory
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.util.LinkedMultiValueMap
import org.springframework.test.web.servlet.MockMvc
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get

private const val CLIENT_ID : String = "app"
private const val CLIENT_SECRET : String = "secret"
private const val USERNAME : String = "admin"
private const val SECRET : String = "secret"

@RunWith(SpringRunner::class)
@SpringBootTest
@AutoConfigureMockMvc
class OAuthMvcTest {

    @Autowired
    private val mvc: MockMvc? = null

    @Test
    fun testAuthenticationAndRefresh() {

        val authenticate = authenticate()

        assertNotNull(authenticate.accessToken)
        assertNotNull(authenticate.refreshToken)

        val refresh = refresh(authenticate.refreshToken)

        assertNotNull(refresh.accessToken)
        assertNotNull(refresh.refreshToken)
    }


    private fun authenticate(): OAuthPojo {

        val params = LinkedMultiValueMap<String, String>()

        params.add("grant_type", "password")
        params.add("client_id", CLIENT_ID)
        params.add("username", USERNAME)
        params.add("password", SECRET)

        val response = mvc?.perform(post("/oauth/token")
                .params(params)
                .with(httpBasic(CLIENT_ID, CLIENT_SECRET))
                .accept("application/json;charset=UTF-8"))
                ?.andExpect(status().isOk())
                ?.andExpect(content().contentType("application/json;charset=UTF-8"))

        val responseJson = JSONObject(response?.andReturn()?.response?.contentAsString)

        return OAuthPojo(responseJson.optString("access_token"), responseJson.optString("refresh_token"))
    }

    private fun refresh(refreshToken: String) : OAuthPojo {

        val params = LinkedMultiValueMap<String, String>()

        params.add("grant_type", "refresh_token")
        params.add("refresh_token", refreshToken)
        params.add("client_id", CLIENT_ID)
        params.add("client_secret", CLIENT_SECRET)

        val response = mvc?.perform(post("/oauth/token")
                .params(params)
                .with(httpBasic(CLIENT_ID, CLIENT_SECRET))
                .accept("application/json;charset=UTF-8"))
                ?.andExpect(status().isOk())

        val responseJson = JSONObject(response?.andReturn()?.response?.contentAsString)

        return OAuthPojo(responseJson.optString("access_token"), responseJson.optString("refresh_token"))
    }

}