# SalonX - Beauty Services Management and Booking Platform

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd repository
    npm install
    npm run dev
    ```


## Project Overview

SalonX is a beauty services management and booking platform that uses Next.js for the frontend and .NET for the backend. The backend project can be found at [https://github.com/j-vinnal/Salon-X-API/](https://github.com/j-vinnal/Salon-X-API/). The public view is hosted on Azure at [https://salonx-nextjs.azurewebsites.net/signin](https://salonx-nextjs.azurewebsites.net/signin).

### Technologies

- **Next.js** - A React framework for server-side rendering and static site generation.
- **Tailwind CSS** - A utility-first CSS framework for rapid UI development.
- **React Hook Forms** - A simple and flexible form management library.
- **Zod** - A TypeScript-first schema declaration and validation library.
- **Axios** - A promise-based HTTP client for making API requests.
- **JWT** - JSON Web Tokens for secure authentication.
- **Docker** - For containerization and deployment.

### Directory Structure

- **`/services`** - API services are separated into their own directory.
  - Examples:
    - `IdentityService` - Services for user authentication and authorization.
    - `BookingService` - Services for managing bookings.
    - `ClientService` - Services for managing clients.
    - `CompanyService` - Services for managing companies.
    - `ImageUploadService` - Services for uploading images.


## Docker (Optional)

### Build and run locally

Create the image:

```bash
docker build -t salonx-nextjs:latest .
```

Run the container

```bash
docker run -d -p 8080:80 salonx-nextjs:latest
```

### Build to Docker Hub

Create the image:

```bash
docker buildx build --progress=plain -t salonx-nextjs:latest .
```

Create a tag:

```bash
docker tag salonx-nextjs <your-docker-hub-profile>/salonx-nextjs:latest
```

Push the image:

```bash
docker push <your-docker-hub-profile>/salonx-nextjs:latest
```

## Personal Note

This project is created for personal practice and learning of Next.js. If you have any questions or suggestions, feel free to reach out!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.