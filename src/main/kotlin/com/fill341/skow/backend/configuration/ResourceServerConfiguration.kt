package com.fill341.skow.backend.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer

@Configuration
@EnableResourceServer
class ResourceServerConfiguration : ResourceServerConfigurerAdapter() {

    override fun configure(resources: ResourceServerSecurityConfigurer?) {
        resources!!.resourceId(RESOURCE_ID).stateless(false)
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.anonymous().disable()
                .authorizeRequests()
                .antMatchers("/api/**").authenticated()
                .antMatchers("/oauth/token").permitAll()
                .and().exceptionHandling().accessDeniedHandler(OAuth2AccessDeniedHandler())
    }

    companion object {
        private val RESOURCE_ID = "resource_id"
    }
}