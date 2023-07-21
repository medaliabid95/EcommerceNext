const Companies = require("../models/Companies.js")

const getAllCompanies = async (req, res) => {
  try {
    const company = await Companies.findAll()
    res.status(200).json(company)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve companies' })
  }
}

const getOneCompany = async (req, res) => {
  try {
    const { companyId } = req.params
    console.log(companyId);
    const company = await Companies.findOne({ where: { id: companyId } })
    if (!company) {
      return res.status(404).json({ error: 'Company not found' })
    }
    res.status(200).json(company)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the company' })
  }
}

const addCompany = async (req, res) => {
  try {
    const {company, rating, review, color, createdAt, Image,sales} = req.body
    const newCompany = await Companies.create({
      company,
      rating,
      review,
      color,
      createdAt,
      Image,
      sales
    })
    res.status(200).json({ message: 'Company added successfully', newCompany })
  } catch (error) {
    res.status(500).json({ error: 'Failed to add the company' })
  }
}

const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { company, rating, review, Image } = req.body
    const updatedCompany = await Companies.findOne({ where: { id: companyId } })
    if (!updatedCompany) {
      return res.status(404).json({ error: 'Company not found' })
    }
    updatedCompany.company = company
    updatedCompany.rating = rating
    updatedCompany.review = review
    updatedCompany.Image = Image
    await updatedCompany.save()
    res.status(200).json({ message: 'Company updated successfully', updatedCompany })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the company' })
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const deletedCompany = await Companies.findOne({ where: { id: companyId } })
    if (!deletedCompany) {
      return res.status(404).json({ error: 'Company not found' })
    }
    await deletedCompany.destroy()
    res.status(200).json({ message: 'Company deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the company' })
  }
}

module.exports = {
  getAllCompanies,
  getOneCompany,
  addCompany,
  updateCompany,
  deleteCompany,
}
