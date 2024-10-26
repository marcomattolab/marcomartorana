---
title: Programming the DJI Tello Drone with Python
date: 2024-10-23
tags: ["python", "drone", "school"]
image : "/img/posts/dji-tello-drone-programming-02.png"
Description  : 'Programming the DJI Tello in Python, explore available simulators to test code safely using Tello drones...'
featured: true
---

# Programming the DJI Tello Drone with Python

The DJI Tello is a compact, affordable, and programmable drone ideal for beginners and educators looking to explore the world of drone technology and coding. Equipped with a camera, it offers a variety of features, including video transmission, precise hovering, and basic tricks. Its compatibility with Python enables developers and enthusiasts to create custom behaviors and flight paths, making it an excellent tool for both learning and experimentation.

In this article, we’ll dive into how you can get started with programming the DJI Tello in Python, explore available simulators to test code safely, and discuss an advanced topic on matrix drone shows using Tello drones.

## Equipment and Setup

To program a DJI Tello drone in Python, you’ll need:
- **A DJI Tello drone** (standard or Tello EDU version)
- **Python installed on your computer** (version 3.6+ recommended)
- **Tello SDK** to access Tello's programmable features
- **A compatible device** (PC, Mac, or mobile device)
- **Wi-Fi connection** to connect to the Tello drone

Setting up your programming environment involves installing Python, configuring the SDK, and ensuring your device can communicate with the drone over Wi-Fi.

## Programming the Tello in Python

With Python, programming the DJI Tello is straightforward thanks to the Tello SDK, which provides a range of commands for movement, rotations, flips, and even camera control. The SDK is compatible with various Python libraries that allow you to establish a connection, send commands, and receive feedback from the drone.

For a simple example, here’s how you can control your Tello with Python:

```python
import socket
import time

# Tello's IP and Port
TELLO_IP = "192.168.10.1"
TELLO_PORT = 8889

# Connect to Tello
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('', 9000))

def send_command(command):
    sock.sendto(command.encode('utf-8'), (TELLO_IP, TELLO_PORT))
    print(f"Sent: {command}")

send_command("command")   # Initiate SDK mode
time.sleep(1)
send_command("takeoff")   # Take off
time.sleep(5)
send_command("land")      # Land
```

This code initiates SDK mode, takes off, hovers for a few seconds, and then lands.

## Drone Simulators for Safe Development

Developing with a real drone has inherent risks, especially in indoor environments. Luckily, simulators allow us to test and iterate on our code safely before using it with an actual Tello.

### DroneBlocks Coding Simulator
The **DroneBlocks Coding Simulator** is an excellent online tool to practice programming a Tello without any hardware. Available at [DroneBlocks Coding Simulator](https://coding-sim.droneblocks.io/), it provides a visual interface where you can test code by simulating movements, rotations, and simple flight paths in a virtual environment. The simulator supports block-based coding, making it especially beginner-friendly for those just getting started with drone programming.

### DroneBlocks Tello Simulator
For a Python-based simulation, the **DroneBlocks Tello Simulator** provides a Tello flight simulator that can be run locally. Installable via [PyPI](https://pypi.org/project/DroneBlocksTelloSimulator/), it allows developers to programmatically control a virtual Tello in Python. This is especially useful for those who wish to work directly with Python scripts and Tello SDK commands in a simulated environment that mimics the behavior of a real Tello.

```bash
pip install DroneBlocksTelloSimulator
```

After installation, you can run Python commands in this environment, providing a safe way to refine your code.

## Advanced Topic: Matrix Drone Shows

An exciting application of DJI Tello drones is the creation of **matrix drone shows**, where multiple drones perform coordinated movements to create intricate patterns and displays. This requires advanced programming techniques, such as automatic path generation, collision avoidance, and synchronization of multiple drones.

A recent study titled ["Implementation of Matrix Drone Show Using Automatic Path Generator with DJI Tello Drones"](https://www.researchgate.net/publication/367059528_Implementation_of_Matrix_Drone_Show_Using_Automatic_Path_Generator_with_DJI_Tello_Drones) explores an automatic path generator that allows for creating these synchronized drone shows. By calculating optimal paths and timings, developers can ensure each drone follows a specific route, avoiding mid-air collisions while achieving complex formations.

To implement a matrix drone show, you would need to:
1. Define the formation pattern and set the starting positions for each drone.
2. Generate unique paths for each drone, taking into account speed, distance, and synchronization.
3. Use the Tello SDK to send commands to each drone in real time, monitoring progress to maintain the formation.

Here’s an example of how a basic path coordination might look:

```python
# Assume each Tello has a unique IP address and can be controlled individually
drones = [("192.168.10.1", 8889), ("192.168.10.2", 8889), ("192.168.10.3", 8889)]
commands = ["up 50", "forward 100", "cw 90"]

# Send commands to all drones
for drone in drones:
    for command in commands:
        send_command(drone, command)
```

This code could be expanded to allow more complex and simultaneous movements. The research presents a robust approach to coordinate multiple drones, paving the way for impressive aerial displays.



![DJI Tello Drone Programming](/img/posts/dji-tello-drone-programming-02.png)


## Final Considerations

Programming the DJI Tello with Python is a rewarding experience, offering insights into both coding and robotics. Whether you’re learning basic controls or experimenting with coordinated multi-drone shows, the Tello is a flexible platform with ample support for developers of all levels. By leveraging simulators, you can practice and refine your code safely. Advanced applications, like drone shows, showcase the potential of using autonomous drones for synchronized performances and illustrate the future of automated drone displays.

The DJI Tello opens doors to creativity and learning, making it a great tool for anyone interested in exploring robotics, automation, or the art of drone programming.

---
## Next Development: Enhancing the Matrix Drone System for Automatic Path Generation

Download Paper: [Implementation_of_Matrix_Drone_URI](/img/posts/matrix_drone_research_paper.pdf)

The advancement of drone technology continues to unfold, particularly in control engineering and design. The Matrix Drone system utilizes the DJI Tello EDU as a cornerstone for further innovations. As previously discussed, the drones are organized into four groups of 25 drones each, connected to a wireless access point, enabling individual command execution for displaying letters or words. The focus now shifts towards enhancing the Automatic Drone Path Generator and optimizing the operational efficiency of the swarm drones.

See Reserch Gate [Implementation_of_Matrix_Drone_URI](https://www.researchgate.net/publication/367059528_Implementation_of_Matrix_Drone_Show_Using_Automatic_Path_Generator_with_DJI_Tello_Drones)


**Automatic drone path generator**
The need for an efficient and reliable path generation algorithm is paramount for the successful operation of the Matrix Drone system. This section explores the development of an automatic drone path generator designed to enhance the flight coordination and minimize the risk of collisions. The algorithm will utilize data from the onboard inertial measurement unit and camera for real-time adjustments during flight.

- A. Implementation using Python
The path generation algorithm will be implemented using Python, leveraging libraries such as NumPy for numerical calculations and OpenCV for image processing. The drones will continuously communicate their positions and status to the Mission Control Computer (MCC), allowing for dynamic adjustments to their flight paths based on real-time data.

- B. Enhanced Swarm Coordination**
To further improve swarm coordination, we will integrate swarm intelligence principles into the path generation process. Each drone will have the capability to assess its surroundings and communicate with neighboring drones, allowing them to adapt their paths collectively. This approach not only optimizes the overall flight performance but also enhances the stability of the swarm in challenging conditions such as strong winds or low light.

**Advancements in matrix drone system desygn**
The design of the Matrix Drone system will undergo significant enhancements to accommodate the new path generation capabilities.

- A. Updated Multi Drone Configuration
As outlined in the previous design, the MCC will maintain its connection to the drones via the same network. However, with the integration of the automatic path generator, the configuration will evolve to include advanced networking protocols that facilitate more robust communication between the drones and the MCC.

- B. Flight Simulation Enhancements
To ensure the new system's reliability, extensive simulations will be conducted. These simulations will test the drones' ability to execute complex flight patterns and respond to dynamic environmental factors. The results will provide valuable insights into potential issues and areas for improvement before real-world implementation.

**Testing and validation** 
Before deploying the enhanced Matrix Drone system, rigorous testing will be essential to validate the functionality of the automatic path generator and the new swarm coordination strategies. Key testing phases will include:

- A. Single Drone Flight Trials
Initial tests will involve single drones executing the newly developed path generation algorithm, ensuring that each drone can accurately follow designated paths without external intervention.

- B. Group Flight Simulations
Subsequent tests will expand to include group flight simulations, where multiple drones will operate simultaneously, demonstrating the effectiveness of the swarm coordination and path generation in real-time scenarios.

**Conslusion**
The next phase of development for the Matrix Drone system promises to enhance the capabilities of swarm drones through the introduction of an automatic drone path generator and improved swarm coordination strategies. These advancements aim to elevate the operational efficiency of the drones while ensuring a higher level of safety during flight operations. Continuous research and testing will be critical as we strive to realize the full potential of this innovative drone system. We extend our gratitude to our technical team for their support in pushing the boundaries of drone technology.
