#!/usr/bin/env bash

fun1(){
while true
do
echo 1
sleep 5
done
}

fun2(){
while true
do
echo 2
sleep 5
done
}

fun1 &
fun2 &
wait