using WebApi.Models;
using WebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Users;
using WebApi.Interfaces;
using WebApi.Models.Data;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : Controller
    {
        private readonly IDataRepository _dataRepository;

        public DataController(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        [Route("GetAllDataTypes")]
        public async Task<IActionResult> GetAllDataTypes()
        {
            try
            {
                List<DataType> dataTypes = new();
                var results = await _dataRepository.GetAllDataTypesAsync();
                foreach (var dataType in results)
                {
                    dataTypes.Add(new DataType
                    {
                        DataTypeID = dataType.DataTypeID,
                        DataTypeName = dataType.DataTypeName,
                    });
                }
                return Ok(dataTypes);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpGet]
        [Route("GetAllData")]
        public async Task<IActionResult> GetAllData()
        {
            try
            {
                var allData = await _dataRepository.GetAllDataAsync();
                List<Data> datas = new();
                foreach (var data in allData)
                {
                    datas.Add(new Data
                    {
                        DataID = data.DataID,
                        DataDescription = data.DataDescription,
                        EmployeeID = data.EmployeeID,
                        DataTypeID = data.DataTypeID,
                    });
                }

                return Ok(allData);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpPost]
        [Route("AddDataType")]
        public async Task<IActionResult> AddDataType(DataTypeViewModel dataTypeModel)
        {
            var dataType = new DataType
            {
                DataTypeName = dataTypeModel.DataTypeName,
            };
            try
            {
                await _dataRepository.AddDataType(dataType);
                return Ok(dataType);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost]
        [Route("AddData")]
        public async Task<IActionResult> AddData(DataRequest dataRequest)
        {
            var data = new Data
            {
                DataDescription = dataRequest.DataDescription,
                DataTypeID = dataRequest.DataTypeID,
                EmployeeID = dataRequest.EmployeeID,
            };
            try
            {
                await _dataRepository.AddData(data);
                return Ok(data);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut]
        [Route("EditDataType")]
        public async Task<IActionResult> EditDataType(int dataTypeID, DataTypeViewModel dataModel)
        {
            try
            {
                var allTypes = await _dataRepository.GetAllDataTypesAsync();
                var existingType = allTypes.FirstOrDefault(x => x.DataTypeID == dataTypeID);
                if (existingType == null) return NotFound($"The Data Type does not exist");

                if (dataModel.DataTypeName == "")
                {
                    existingType.DataTypeName = existingType.DataTypeName;
                }
                else
                {
                    existingType.DataTypeName = dataModel.DataTypeName;
                }

                if (await _dataRepository.SaveChangesAsync() == true)
                {
                    return Ok(existingType);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpDelete]
        [Route("DeleteDataType")]
        public async Task<IActionResult> DeletaDataType(int dataTypeID)
        {
            try
            {
                var allTypes = await _dataRepository.GetAllDataTypesAsync();
                var existingType = allTypes.FirstOrDefault(x => x.DataTypeID == dataTypeID);

                if (existingType == null) return NotFound($"The DataType does not exist");

                _dataRepository.Delete(existingType);

                if (await _dataRepository.SaveChangesAsync()) return Ok(existingType);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpPut]
        [Route("EditData")]
        public async Task<IActionResult> EditData(int dataID, Data data)
        {
            try
            {
                var allData = await _dataRepository.GetAllDataAsync();
                var existingData = allData.FirstOrDefault(x => x.DataID == dataID);
                if (existingData == null) return NotFound($"The data does not exist");

                if (data.DataDescription == "")
                {
                    existingData.DataDescription = existingData.DataDescription;
                }
                else
                {
                    existingData.DataDescription = data.DataDescription;
                }
                if (data.DataTypeID == null)
                {
                    existingData.DataTypeID = existingData.DataTypeID;
                }
                else
                {
                    existingData.DataTypeID = data.DataTypeID;
                }

                if (await _dataRepository.SaveChangesAsync() == true)
                {
                    return Ok(existingData);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpDelete]
        [Route("DeleteData")]
        public async Task<IActionResult> DeleteData(int dataID)
        {
            try
            {
                var allData = await _dataRepository.GetAllDataAsync();
                var existingData = allData.FirstOrDefault(x => x.DataID == dataID);

                if (existingData == null) return NotFound($"The Data does not exist");

                _dataRepository.Delete(existingData);

                if (await _dataRepository.SaveChangesAsync()) return Ok(existingData);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
    }
}