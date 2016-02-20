package main

import "github.com/gin-gonic/gin"

const ctxPath string = "/ga"

func ping(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pongo ongo!",
	})
}

func main() {
	r := gin.Default()
	r.Use(ServeAssets(ctxPath, "./.tmp", "./public"))
	router := r.Group(ctxPath)
	router.GET("/api/v1/ping", ping)
	r.Run() // listen and server on 0.0.0.0:8080
}
