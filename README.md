# Weather-dashboard
Created with CodeSandbox

A user-friendly weather dashboard built with React, utilizing the OpenWeather API for real-time weather data and styled with CSS.

## Features
- Displays current weather conditions.
- Provides a 5-day weather forecast.
- Search functionality for cities worldwide.

## Tech Stack
- **Frontend**: React
- **API**: OpenWeather API

## Screenshots
![Weather dashboard](https://github.com/user-attachments/assets/8393f984-c1a5-4e2f-bedd-6acbae0ed804)

## Live Demo
[Weather dashboard link](https://y7yqnn.csb.app/)



## Setup Instructions

Follow these steps to set up the Weather Dashboard project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/RushithaM/Weather-dashboard.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd Weather-dashboard
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Add your OpenWeather API key**:
    - Create a `.env` file in the root directory.
    - Add the following line, replacing `YOUR_API_KEY` with your OpenWeather API key:
      ```
      REACT_APP_OPENWEATHER_API_KEY=YOUR_API_KEY
      ```

5. **Run the application**:
    ```bash
    npm start
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

## Dependencies
- React
- Axios (for API calls)
- dotenv (to manage environment variables)
