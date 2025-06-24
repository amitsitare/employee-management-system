package org.configuration.em_project;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImp implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;
    // List<Employee> employees = new ArrayList<>();

    @Override
    public String createEmployee(Employee employee) {
        // TODO Auto-generated method stub
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        // employees.add(employee);
        return "Data added successfully";
    }

    @Override
    public List<Employee> readEmployees() {
        // TODO Auto-generated method stub
        List<EmployeeEntity> employeeEntities = employeeRepository.findAll();
        List<Employee> employees = new ArrayList<>();
        for (EmployeeEntity employeeEntity : employeeEntities) {
            Employee employee = new Employee();
            BeanUtils.copyProperties(employeeEntity, employee);
            employees.add(employee);
        }
        return employees;
    }

    @Override
    public boolean deleteEmployee(Long id) {
        // employees.removeIf(employee -> employee.getId().equals(id));
        // employeeRepository.deleteById(id);
        EmployeeEntity employeeEntity = employeeRepository.findById(id).orElse(null);
        if (employeeEntity == null) {
            return false;
        }
        employeeRepository.delete(employeeEntity);
        return true;
    }

    @Override
    public boolean updateEmployee(Long id, Employee employee) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).orElse(null);
        if (employeeEntity == null) {
            return false;
        }
        employeeEntity.setName(employee.getName());
        employeeEntity.setPhone(employee.getPhone());
        employeeEntity.setEmail(employee.getEmail());
        employeeRepository.save(employeeEntity);
        return true;
    }

    @Override
    public Employee readEmployee(Long id) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).orElse(null);
        if (employeeEntity == null) {
            return null;
        }
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeEntity, employee);
        return employee;
    }

}
