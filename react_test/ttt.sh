#!/usr/bin/env bash

fun1(){
    webpack-dev-server --colors --debug --content-base ./www --port 8080 --mode development --open
}

fun2(){
    node app.js
}

fun1 &
fun2 &
wait

