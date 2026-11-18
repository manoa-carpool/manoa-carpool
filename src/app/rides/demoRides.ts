// Sample rides for the M1 mockups (shared by the landing page and Find a Ride).
// M2 replaces these with open rides from the database (issue #117).
export type DemoRide = {
  driver: string;
  from: string;
  to: string;
  day: string;
  time: string;
  seats: number;
  verified?: boolean;
};

export const demoRides: DemoRide[] = [
  { driver: 'AlohaAlex', from: 'Kapolei', to: 'UH Mānoa', day: 'Today', time: '7:15 AM', seats: 1, verified: true },
  { driver: 'UHDrive808', from: 'Pearl City', to: 'UH Mānoa', day: 'Today', time: '7:45 AM', seats: 2 },
  { driver: 'MānoaRider', from: 'UH Mānoa', to: 'Ala Moana Center', day: 'Today', time: '3:30 PM', seats: 2, verified: true },
  { driver: 'KaneoheKai', from: 'Kaneohe', to: 'UH Mānoa', day: 'Tomorrow', time: '8:00 AM', seats: 3 },
  { driver: 'EwaEmma', from: 'UH Mānoa', to: 'Ewa Beach', day: 'Tomorrow', time: '5:00 PM', seats: 1 },
];
