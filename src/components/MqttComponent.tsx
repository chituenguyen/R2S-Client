import { useEffect, useState } from "react"
import mqtt from "mqtt"

function MqttComponent() {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null)
  const [messages, setMessages] = useState<string[]>([])
  const [messageToSend, setMessageToSend] = useState<string>("")

  useEffect(() => {
    const topic = "r2s"
    const mqttConfig = {
      hostname: "devapi.uniscore.vn",
      port: 443,
      protocol: "wss",
      username: "football",
      password: "football123",
      path: "/mqtt"
    }
    const mqttClient = mqtt.connect(
      `wss://${mqttConfig.hostname}:${mqttConfig.port}${mqttConfig.path}`,
      {
        username: mqttConfig.username,
        password: mqttConfig.password
      }
    )

    mqttClient.on("connect", () => {
      console.log("Kết nối thành công với MQTT broker")
      mqttClient.subscribe(topic, (err) => {
        if (err) console.error("Lỗi đăng ký chủ đề:", err)
        else console.log("Đã đăng ký chủ đề r2s")
      })
    })

    mqttClient.on("message", (topic, payload) => {
      console.log("Nhận tin nhắn:", payload.toString())
      setMessages((prev) => [...prev, payload.toString()])
    })

    mqttClient.on("error", (err) => {
      console.error("Lỗi MQTT:", err)
    })

    setClient(mqttClient)

    return () => {
      if (mqttClient) {
        mqttClient.end()
      }
    }
  }, [])

  const sendMessage = () => {
    if (client) {
      client.publish("r2s", messageToSend)
      setMessageToSend("")
    }
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-xl font-semibold text-center mb-4">MQTT Messages</h1>
      <div className="mb-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className="bg-white p-2 my-2 rounded border">
              {message}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Chưa có tin nhắn nào nhận được.</p>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="Nhập tin nhắn để gửi"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default MqttComponent
