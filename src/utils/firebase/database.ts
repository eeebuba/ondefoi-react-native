import {
  ITransaction,
  TTransactionCreate,
  TTransactionUpdate,
} from '@src/@types/transaction';
import { IUser } from '@src/@types/user';
import { startOfDay } from 'date-fns';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from './firebase';

// ----------------------------------------------------------------------

class dbService {
  constructor(readonly userId: string) {}

  dbMethods() {
    const userDocRef = doc(db, 'users', this.userId);
    //
    const transactionsColRef = collection(userDocRef, 'transactions');

    return {
      user: {
        show: async () => {
          const doc = await getDoc(userDocRef);
          return {
            ...doc.data(),
          } as IUser;
        },
      },

      transaction: {
        create: (data: TTransactionCreate) => {
          return addDoc(transactionsColRef, {
            ...data,
            occurred_at: startOfDay(data.occurred_at),
          } as TTransactionCreate);
        },

        update: (id: string, data: TTransactionUpdate) => {
          const _docRef = doc(transactionsColRef, id);
          return updateDoc(_docRef, {
            ...data,
          } as TTransactionUpdate);
        },

        index: (callback: (data: ITransaction[]) => void) => {
          return onSnapshot(transactionsColRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
                // occurred_at: (doc.data() as ITransaction).occurred_at.date(),
              } as ITransaction;
            });
            callback(data);
          });
        },

        delete: (id: string) => {
          const _docRef = doc(transactionsColRef, id);
          return deleteDoc(_docRef);
        },
      },
    };
  }
}

// ----------------------------------------------------------------------

const dbMethods = () => {
  const instance = new dbService(auth.currentUser?.uid as string);
  return instance.dbMethods();
};

// ----------------------------------------------------------------------

export { dbMethods };
