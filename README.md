# Internet of Things Oscilloscope

ESP32-based IoT Oscilloscope

## Purpose
An oscilloscope is an essential tool for professionals in a variety of fields, especially for Electrical and Computer Engineers. Handheld oscilloscopes like the [Analog Discovery](https://digilent.com/shop/analog-discovery-2-100ms-s-usb-oscilloscope-logic-analyzer-and-variable-power-supply/) have revolutionized the workflow of ECEs through USB oscilloscopes that provide an easy-to-use interface. 

This project takes the approach of Analog Discovery to the next level by introducing a handheld oscilloscope that’s also internet connected. This form factor creates possibilities for workflows that are were not possible with conventional oscilloscopes - remote labs, smart home/lab control, automatic data collection are some of such possibilities. The Internet of Things Oscilloscope or ioto being introduced in this project is based around the [ESP32 SoC](https://www.espressif.com/en/products/socs/esp32).

## Features and Advantages

### Web Application
The most important feature of ioto is its custom web application which can be accessed via an access point IP address served by the ESP32. Since the web application is the control mechanism for ioto, it makes the device truly wireless. This means a user can create an experimental setup with ioto and can remotely control equipment, record and export data, and monitor the experiment without having to be physically present in lab. The interface of the web application is incredibly intuitive and is divided into two sections: Digital and Analog, corresponding to ioto's two main functionalities.

![Screenshot 2022-04-28 100854](https://user-images.githubusercontent.com/38775985/165778796-3ffd0167-54e7-45f9-b518-7800993c0cb6.png)

### Digital IO
ioto contains 6 digital channels (which can be easily expanded). The digital channels can set as input or output and can read or set logic `HIGH (1)` or `LOW (0)` on each of the channels independently. The state and value of each of the digital channels can be set using the web application. The digital IO functionality can support a multitude of applications from basic button/interrupt handling and LED control to complex combinational logics and circuits.

### Analog Scoping
ioto contains 2 analog channels (which can also be easily expanded). The analog scope can read analog voltages in the range of 0-2.5V. Each channel independently reads the voltage and plots it on a graph on the web application. The plot layout and sampling frequency can be modified and graphs can be exported as images. The analog scoping functionality can be used in a multitude applications as well from sensor data recording to circuit debugging.

## Technical Specifications
* Analog channels - 2 (expandable to 18 for ESP32-S2 dev board)
* Analog-to-digital conversion (ADC) resolution - 12 bits
* Measurable analog input voltage range - 0 mV ~ 2500 mV (at 11 dB attenutation)
* Digital channels - 6 (expandable to 34 for ESP32-S2 dev board)

## Installation and Usage

