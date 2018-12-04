package com.fill341.skow.backend.controller

import com.fill341.skow.backend.model.AppMessage
import com.fill341.skow.backend.model.WebSocketEvent
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.web.bind.annotation.*
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.SimpMessageSendingOperations
import java.security.Principal

@RestController
@MessageMapping("/ws/in")
internal class WsController {

    @Autowired
    private val messagingTemplate: SimpMessageSendingOperations? = null


    @MessageMapping("/{messageId}")
    fun processMessage(@DestinationVariable messageId: String, message: AppMessage, principal: Principal) {
        messagingTemplate?.convertAndSend("/ws/out/message/$messageId", WebSocketEvent("server.ws.NEW_MESSAGE", principal.name, message.content))
    }
}