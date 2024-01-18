import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

function SignupForm() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isSigningUp } = useSignup();

  function onSubmit({ email, password, fullName }) {
    signup({ email, password, fullName }, { onSettled: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isSigningUp}
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isSigningUp}
          type="email"
          id="email"
          {...register("email", {
            required: "An email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isSigningUp}
          type="password"
          id="password"
          {...register("password", {
            required: "A valid password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isSigningUp}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value, formValues) =>
              value === formValues.password || "The passwords do not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isSigningUp} $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
