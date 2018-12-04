package com.fill341.skow.backend.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.SimpMessageType.*
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer

@Configuration
class WebSocketSecurityConfiguration : AbstractSecurityWebSocketMessageBrokerConfigurer() {

    override fun configureInbound(messages: MessageSecurityMetadataSourceRegistry?) {
        messages!!.simpDestMatchers("/ws/**").permitAll()
                .simpTypeMatchers(CONNECT, UNSUBSCRIBE, SUBSCRIBE, DISCONNECT).fullyAuthenticated()
                .anyMessage().fullyAuthenticated()
    }

    override fun sameOriginDisabled(): Boolean {
        return true
    }
}