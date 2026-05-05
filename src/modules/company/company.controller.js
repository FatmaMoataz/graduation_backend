import * as companyService from '../company/company.service.js';

export const createCompany = async(req,res) => { 
 try {
    const company = await companyService.createCompanyService(req.body);
    res.status(201).json({ success: true, data: company });
 } catch (error) {
    res.status(400).json({ success: false, message: error.message });
 }
}

export const getAllCompanies = async(req,res) => { 
 try {
    const companies = await companyService.getAllCompaniesService();
    res.status(200).json({ success: true, data: companies });
 } catch (error) {
    res.status(500).json({ success: false, message: error.message });
 }
}

export const getCompanyById = async(req,res) => { 
 try {
    const company = await companyService.getCompanyByIdService(req.params.id);
    res.status(200).json({ success: true, data: company });
 } catch (error) {
    res.status(500).json({ success: false, message: error.message });
 }
}

export const updateCompany = async(req,res) => { 
 try {
   if(!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: 'No data provided for update' });
   }
    const company = await companyService.updateCompanyService(req.params.id, req.body);
    if(!company) {
        res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.status(200).json({ success: true, data: company });
 } catch (error) {
    res.status(400).json({ success: false, message: error.message });
 }
}

export const deleteCompany = async(req,res) => { 
 try {
    const company = await companyService.deleteCompanyService(req.params.id);
    if(!company) {
        res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.status(200).json({ success: true, message: 'Company deleted successfully' });
 } catch (error) {
    res.status(500).json({ success: false, message: error.message });
 }
}