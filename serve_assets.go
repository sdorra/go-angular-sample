package main

import (
	"github.com/gin-gonic/gin"

	"os"
	"strings"
)

func exists(path string) bool {
	stat, err := os.Stat(path)
	return !os.IsNotExist(err) && !stat.IsDir()
}

func serveDirectory(c *gin.Context, roots []string, index, p string) {
	servePath := ""
	for _, root := range roots {
		path := root + p
		if exists(path) {
			servePath = path
			break
		}
	}
	if len(servePath) == 0 {
		servePath = index
	}

	c.File(servePath)
}

func findIndex(roots []string) string {
	for _, root := range roots {
		path := root + "/index.html"
		if exists(path) {
			return path
		}
	}
	return ""
}

// ServeAssets serves static files if they exists
func ServeAssets(ctxPath string, roots ...string) gin.HandlerFunc {
	index := findIndex(roots)
	return func(c *gin.Context) {
		p := c.Request.URL.Path
		if strings.HasPrefix(p, ctxPath) && !strings.HasPrefix(p, ctxPath+"/api") {
			path := strings.TrimPrefix(p, ctxPath)
			serveDirectory(c, roots, index, path)
		}
		c.Next()
	}
}
