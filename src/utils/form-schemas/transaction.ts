import * as Yup from 'yup';

// ----------------------------------------------------------------------

const Update = Yup.object().shape({
  description: Yup.string()
    .required('Informe uma descrição')
    .min(3, 'Mínimo 3 caracteres')
    .max(32, 'Máximo 32 caracteres'),
  value: Yup.number()
    .required('Informe o valor')
    .max(999999, 'Máximo de 999.999,99')
    .typeError('Informe o valor'),
});

const Create = Update.concat(
  Yup.object().shape({
    type: Yup.string()
      .required('Informe o tipo')
      .oneOf(['entry', 'exit'], 'Tipo inválido'),
  }),
);

// ----------------------------------------------------------------------

const TransactionSchemas = { Create, Update };

export default TransactionSchemas;
