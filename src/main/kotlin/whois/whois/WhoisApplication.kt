package whois.whois

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class WhoisApplication

fun main(args: Array<String>) {
    runApplication<WhoisApplication>(*args)
}
