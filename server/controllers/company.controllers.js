import companyService from '../services/company.services.js';

class companyController {
    static async createCompany(req, res) {
        try {
            const companyData = req.body;
            const newCompany = await companyService.createCompany(companyData);
            return res.status(201).json(newCompany);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static async getAllCompanies(req, res) {
        try {
            const companies = await companyService.getAllCompanies();
            return res.status(200).json(companies);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async findCompanyById(req, res) {
        try {
            const { id } = req.params;
            const company = await companyService.findCompanyById(id);
            return res.status(200).json(company);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    static async updateCompany(req, res) {
        try {
            const { id } = req.params;
            const companyData = req.body;
            const updatedCompany = await companyService.updateCompany(id, companyData);
            return res.status(200).json(updatedCompany);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static async deleteCompany(req, res) {
        try {
            const { id } = req.params;
            const result = await companyService.deleteCompany(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}

export default companyController;
