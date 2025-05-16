# Event-Management-Portal

A modern, full-featured event management platform built with React, TypeScript, and Tailwind CSS. This application enables event organizers to create and manage events while allowing attendees to book tickets and receive digital QR code tickets.

## Features

### For Event Organizers
- Create and manage events with detailed information
- Set multiple ticket types with different pricing policies
- View comprehensive attendee lists
- Track ticket sales and attendance

### For Attendees
- Browse and search for events
- RSVP to events
- Secure payment processing
- Receive QR code tickets after payment
- View all purchased tickets in one place

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **QR Code Generation**: QRCode Generator
- **State Management**: React Context API
- **UUID Generation**: UUID

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/riant-creations/Event-Management-Portal.git>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Demo Accounts

The application comes with two demo accounts for testing:

### Organizer Account
- Email: john@example.com
- Password: any password will work

### Attendee Account
- Email: jane@example.com
- Password: any password will work

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React Context providers
├── data/          # Mock data and utilities
├── pages/         # Page components
├── types/         # TypeScript type definitions
└── main.tsx       # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.