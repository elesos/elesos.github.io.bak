---
layout: post
title: Python setuptools 和 pip 安装
date: 2022-04-30 05:30:00 +0800
categories: [Python]
tags: [Python]
---
## setuptool
```
wget https://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11-py2.7.egg  --no-check-certificate
chmod +x setuptools-0.6c11-py2.7.egg && sh setuptools-0.6c11-py2.7.egg
```
## pip
```
wget https://pypi.python.org/packages/source/p/pip/pip-1.3.1.tar.gz --no-check-certificate
tar zxvf pip-1.3.1.tar.gz &&  cd pip-1.3.1
python setup.py install
pip -V
python -m pip install --upgrade pip setuptools //更新
```
## ubuntu
apt-get install python-pip
## 更新包
pip install --upgrade youtube-dl