import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";

import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckout } from "../check-in-out/useCheckout";
import { useBooking } from "./useBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();
  const { checkout, isChekingout } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleCheckIn() {
    navigate(`/checkin/${id}`);
  }

  function handleCheckOut() {
    checkout({ bookingId: id });
  }

  if (isLoading) return <Spinner />;

  const { status, id } = booking;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag $type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>

        {status === "unconfirmed" && (
          <Button onClick={handleCheckIn}>Check in</Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={handleCheckOut}
            disabled={isChekingout}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="deleteBooking">
            <Button $variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => {
                deleteBooking(id, {
                  onSettled: () => {
                    navigate(-1);
                  },
                });
              }}
              disabled={isDeletingBooking}
            ></ConfirmDelete>
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
