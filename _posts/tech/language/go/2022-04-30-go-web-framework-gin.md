---
layout: post
title: Go web框架gin使用手册
date: 2022-04-30 05:30:00 +0800
categories: [go]
tags: [go]
---
```
go get github.com/gin-gonic/gin  #go get：add dependencies to current module and install them，https://golang.google.cn/cmd/go/
 
import "github.com/gin-gonic/gin"
import "net/http"  // using constants such as http.StatusOK.





func main() {
	router := gin.Default()
        
        //router.GET("/someGet", getting)
        //router.POST("/somePost", posting)
	
	// 如 /welcome?firstname=Jane&lastname=Doe
	router.GET("/welcome", func(c *gin.Context) {
		firstname := c.DefaultQuery("firstname", "Guest")
		lastname := c.Query("lastname") 

		c.String(http.StatusOK, "Hello %s %s", firstname, lastname)
	})
	router.Run(":8080")        
        //router.Run()    // By default it serves on :8080 

}
```