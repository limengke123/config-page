# 应用配置页面

## 规则

为了配置 app 应用，主要分为两块配置:

1. 应用规则配置
2. 应用实际配置

### 应用规则配置

应用规则配置实质上就是对**配置页面有哪些具体配置**的一个配置，包括有哪些应用可以被配置、该应用下又有哪些**字段**可以被配置、以及该字段的默认值设置和值的不同表单形式展现。

针对应用规则配置的 `json` 文件而言，有几个 `key` 需要说明（可以在 `./server/data/page-config.json` 查看该类配置实例，实际情况是此处配置文件由接口得到）：

```json
{
  "readerCenter": {
    "name": "读者中心",
    "version": "1.0.0",
    "children": [
      {
        "name": "基本配置",
        "fields": "baseInfo",
        "rules": [
          {
            "name": "基本信息",
            "fields": "infos",
            "isRequired": false,
            "type": "input",
            "defaultValue": "default infos"
          }
        ]
      },
      {
          "name": "个人信息",
          "fields": "userInfo",
          "rules": [
            {
              "name": "账号",
              "fields": "username",
              "isRequired": false,
              "type": "input",
              "defaultValue": "default username"
            },
            {
              "name": "密码",
              "fields": "password",
              "isRequired": true,
              "type": "input",
              "defaultValue": "default password"
            },
            {
              "name": "密码2",
              "fields": "password333",
              "isRequired": true,
              "type": "input",
              "defaultValue": "default password"
            }
          ]
      }
    ]
  }
}
```

* "readerCenter" 很重要,表明该应用的名称，内部会用该字段涉及到相关路由，不能重复
  * "name" 应用中文名，会在配置页面中显示该中文名
  * "version" 版本号，暂时没有作用
  * "children" 该应用下的子配置，是一个数组
    * "name" 子配置名称，在配置页面显示该子配置名称
    * "fields" 该子配置下的字段名称
    * "rules" 子配置的具体配置项，很重要，具体细节下面详细说
    
#### `rules` 配置项设置

`rules` 是一个数组格式:

* "name" 注明该配置项的名称
* "fields" 注明该配置项实际字段名称
* "isRequired" 注明该字段是否为必须项
* "type" 注明该配置项展示表单形式
* "defaultValue" 注明该配置项的默认值

这里的 `type` 属性提供了 [`antd`](https://ant.design/components/form-cn/) 组件库有的几种表单组件,具体如下: 

1. "input" 输入框
2. "input-number" 数字输入框，此时，在同级上新增接受两个参数：
    * "min" {@type=Number} {@defaultValue=0} 数字输入框的最小值
    * "max" {@type=Number} {@defaultValue=10} 数字输入框的最大值
3. "select" 下拉框，此时，在同级上新增接受一个参数，注意此时传入的 `defaultValue` 应保持和 `selectValue` 中的 `value` 一致：
    * selectValue {@type=Array} {@defaultValue=null} 下拉框的可选项, `selectValue` 接受如下参数:
        * "displayValue" {@type=String} 下拉框选项显示值
        * "value" {@type=String} 下拉框实际返回值
        * "defaulted" {@type=Boolean} 是否默认选中该项
4. "select-multiple" 多选下拉框，参考 `select` 的参数
5. "switch" 开关
6. "radio-group" 单选框，功能和 `select` 类似，参数也和 `select` 类似
7. "radio-button" 单选按钮，功能和 `radio-group` 类似，参数参考 `radio-group`
8. "date-picker" 日期选择器，注意：传入的 `defaultValue` 的格式必须类似于 "2018-07-15"，月份和日期需补足两位
9. "text" 纯文字显示

具体表单组件展示如图：

![表单组件](static/1.png)
