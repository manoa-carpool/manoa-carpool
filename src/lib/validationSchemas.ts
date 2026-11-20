import * as yup from 'yup';

/** Validation shared by the Post a Ride form and its server action. */
export const RideSchema = yup.object({
  origin: yup.string().trim().required('Choose a starting area.'),
  destination: yup.string().trim()
    .required('Choose a destination.')
    .test('different-area', 'Destination must be different from From.', function (value) {
      return !value || !this.parent.origin || value !== this.parent.origin;
    }),
  departureTime: yup.date()
    .typeError('Choose a valid departure date and time.')
    .required('Choose a departure date and time.')
    .test('future', 'Departure must be in the future.', (value) => !!value && value.getTime() > Date.now()),
  seats: yup.number()
    .typeError('Enter the number of available seats.')
    .required('Enter the number of available seats.')
    .integer('Seats must be a whole number.')
    .min(1, 'At least one seat is required.')
    .max(7, 'You can offer at most seven seats.'),
  notes: yup.string().default('').max(1000, 'Notes must be 1,000 characters or fewer.'),
});

export type RideFormValues = yup.InferType<typeof RideSchema>;
