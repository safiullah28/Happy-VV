import Bank from "../models/bank.model.js";
export const addBank = async (req, res) => {
  try {
    const { name, description, amount, debit, balance } = req.body;
    let bank = await Bank.findOne({ name });
    if (bank) {
      return res.status(400).json({
        message: `Bank already exists`,
      });
    }
    bank = await Bank.create({
      name,
      description,
      amount: Number(amount),
      debit: Number(debit),
      balance: Number(debit),
    });
    res.status(201).json({
      message: `Bank created`,
      bank,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in addBank controller : ${error.message}`,
    });
    console.log(`Error in addBank controller : ${error}`);
  }
};

export const updateAmount = async (req, res) => {
  try {
    const { bankId } = req.params;
    const { description, debit, credit } = req.body;
    let bank = await Bank.findById(bankId);
    if (!bank) {
      return res.status(404).json({
        message: `Bank not exists`,
      });
    }
    if (description) bank.description = description;

    if (
      debit !== undefined &&
      debit !== null &&
      debit !== "" &&
      debit !== 0 &&
      debit !== "0"
    ) {
      const newdebit = Number(debit);
      if (!isNaN(newdebit)) {
        bank.debit = newdebit;
        bank.balance = Number(bank.balance) + newdebit;
      }
    }
    if (
      credit !== undefined &&
      credit !== null &&
      credit !== "" &&
      credit !== 0 &&
      credit !== "0"
    ) {
      const newcredit = Number(credit);
      if (!isNaN(newcredit)) {
        bank.credit = newcredit;
        bank.balance = Number(bank.balance) - newcredit;
      }
    }
    await bank.save();
    res.status(200).json({
      message: `Amount credited. New balance is ${bank.balance}`,
      bank,
      bankId,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in updateAmount controller : ${error.message}`,
    });
    console.log(`Error in updateAmount controller : ${error}`);
  }
};

export const getAllBanks = async (req, res) => {
  try {
    const banks = await Bank.find({});
    res.status(200).json({
      banks,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getAllBanks controller : ${error.message}`,
    });
    console.log(`Error in getAllBanks controller : ${error}`);
  }
};

export const getSingleBank = async (req, res) => {
  try {
    const { bankId } = req.params;
    const bank = await Bank.findById(bankId);
    if (!bank) {
      return res.status(404).json({
        message: `Bank not found`,
      });
    }
    res.status(200).json({
      bank,
      bankId,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getSingleBank controller : ${error.message}`,
    });
    console.log(`Error in getSingleBank controller : ${error}`);
  }
};
