import Company from "../database/models/company.models.js";

class companyService {
    static async createCompany(companyData) {
        if (!companyData) {
            throw new Error('Company Data is Required');
        }
        try {
            const newCompany = await Company.create(companyData);
            return newCompany;
        } catch (error) {
            throw new Error('Error creating new Company: ' + error.message);
        }
    }

    static async getAllCompanies() {
        return await Company.findAll();
    }

    static async findCompanyById(id) {
        const company = await Company.findByPk(id);
        if (!company) {
            throw new Error('Company not found');
        }
        return company;
    }

    static async updateCompany(id, companyData) {
        if (!companyData) {
            throw new Error('Company Data is Required for Update');
        }
        try {
            const [updated] = await Company.update(companyData, {
                where: { id }
            });
            if (updated) {
                return await Company.findByPk(id);
            }
            throw new Error('Company not found');
        } catch (error) {
            throw new Error('Error updating Company: ' + error.message);
        }
    }

    static async deleteCompany(id) {
        try {
            const deleted = await Company.destroy({
                where: { id }
            });
            if (deleted) {
                return { message: 'Company deleted successfully' };
            }
            throw new Error('Company not found');
        } catch (error) {
            throw new Error('Error deleting Company: ' + error.message);
        }
    }
}

export default companyService;
