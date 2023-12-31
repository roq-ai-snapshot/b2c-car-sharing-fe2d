import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createDashboard } from 'apiSdk/dashboards';
import { dashboardValidationSchema } from 'validationSchema/dashboards';
import { CompanyInterface } from 'interfaces/company';
import { UserInterface } from 'interfaces/user';
import { getCompanies } from 'apiSdk/companies';
import { getUsers } from 'apiSdk/users';
import { DashboardInterface } from 'interfaces/dashboard';

function DashboardCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DashboardInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDashboard(values);
      resetForm();
      router.push('/dashboards');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DashboardInterface>({
    initialValues: {
      last_logged_in: new Date(new Date().toDateString()),
      total_bookings: 0,
      total_cars: 0,
      company_id: (router.query.company_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: dashboardValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Dashboards',
              link: '/dashboards',
            },
            {
              label: 'Create Dashboard',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Dashboard
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="last_logged_in" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Logged In
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_logged_in ? new Date(formik.values?.last_logged_in) : null}
              onChange={(value: Date) => formik.setFieldValue('last_logged_in', value)}
            />
          </FormControl>

          <NumberInput
            label="Total Bookings"
            formControlProps={{
              id: 'total_bookings',
              isInvalid: !!formik.errors?.total_bookings,
            }}
            name="total_bookings"
            error={formik.errors?.total_bookings}
            value={formik.values?.total_bookings}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_bookings', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Cars"
            formControlProps={{
              id: 'total_cars',
              isInvalid: !!formik.errors?.total_cars,
            }}
            name="total_cars"
            error={formik.errors?.total_cars}
            value={formik.values?.total_cars}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_cars', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/dashboards')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'dashboard',
    operation: AccessOperationEnum.CREATE,
  }),
)(DashboardCreatePage);
