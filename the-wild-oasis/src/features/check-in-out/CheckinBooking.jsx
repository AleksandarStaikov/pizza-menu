import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBeakfast] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
    setAddBeakfast(booking?.hasBreakfast ?? false);
  }, [booking, setConfirmPaid]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    extrasPrice,
    cabinPrice,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: extrasPrice + getBreakfastPrice(),
          totalPrice: totalPrice + getBreakfastPrice(),
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  function handleAddBreakfast() {
    setAddBeakfast((x) => {
      let shouldAddBreakfast = !x;
      if (shouldAddBreakfast && !booking.hasBreakfast) {
        setConfirmPaid(false);
      }
      return shouldAddBreakfast;
    });
  }

  function getBreakfastPrice() {
    return settings.breakfastPrice * numNights * numGuests;
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={handleAddBreakfast}
          disabled={booking.hasBreakfast || isCheckingIn}
          id="add-breakfast"
        >
          Want to add breakfast for {numGuests} for{" "}
          {formatCurrency(getBreakfastPrice())}?
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((x) => !x)}
          disabled={
            (addBreakfast === booking.hasBreakfast && booking.isPaid) ||
            isCheckingIn
          }
          id="confirm-paid"
        >
          {/* No breakfast */}
          {addBreakfast === false && (
            <>
              I confirm that {guests.fullName} has paid the total amount of{" "}
              {formatCurrency(totalPrice)}!
            </>
          )}

          {/* Added breakfast */}
          {addBreakfast === true &&
            hasBreakfast == false &&
            `I confirm that ${
              guests.fullName
            } has paid the total amount of ${formatCurrency(
              totalPrice + getBreakfastPrice()
            )} (${formatCurrency(totalPrice)}  + ${formatCurrency(
              getBreakfastPrice()
            )})!`}

          {/* Already had breakfast */}
          {addBreakfast === hasBreakfast &&
            addBreakfast === true &&
            `I confirm that ${
              guests.fullName
            } has paid the total amount of ${formatCurrency(
              totalPrice
            )} (${formatCurrency(cabinPrice)} + ${formatCurrency(
              extrasPrice
            )})!`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
