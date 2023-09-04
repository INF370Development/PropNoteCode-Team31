using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Interfaces;
using WebApi.Models.Admin;
using WebApi.Repositories;
using WebApi.ViewModels;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SnagListController : ControllerBase
    {
        private readonly ISnagListRepository _snagListRepository;

        public SnagListController(ISnagListRepository snagListRepository)
        {
            _snagListRepository = snagListRepository;
        }

        /*
        // SnagList Actions

        [HttpGet("GetAllSnagLists")]
        public async Task<IActionResult> GetAllSnagLists()
        {
            try
            {
                var results = await _snagListRepository.GetAllSnagListsAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetSnagList/{SnagListId}")]
        public async Task<IActionResult> GetSnagList(int SnagListId)
        {
            try
            {
                var result = await _snagListRepository.GetSnagListByID(SnagListId);

                if (result == null)
                    return NotFound("SnagList does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpGet("lastSnagList")]
        public async Task<IActionResult> lastSnagList()
        {
            try
            {
                int result = await _snagListRepository.CountSnagList();

                if (result == null)
                    return NotFound("SnagListItem does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost("AddSnagList")]
        public async Task<IActionResult> AddSnagList( SnagListViewModel snagListViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid input data");

            SnagList snagList = new SnagList
            {
                PropertyId = snagListViewModel.PropertyId,
                SnagListDescription=snagListViewModel.SnagListDescription,
                SnagListCreated = DateTime.Now,
                SnagListModified = DateTime.Now
            };

            try
            {
                await _snagListRepository.CreateSnagList(snagList);
                return Ok(snagList);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut("EditSnagList/{SnagListId}")]
        public async Task<IActionResult> EditSnagList(int SnagListId, SnagListViewModel snagListViewModel)
        {
            try
            {
                var existingSnagList = await _snagListRepository.GetSnagListByID(SnagListId);
                if (existingSnagList == null) return NotFound("The SnagList does not exist");

                if (snagListViewModel.SnagListDescription != "")
                {
                    existingSnagList.SnagListDescription = snagListViewModel.SnagListDescription;
                }
                if (snagListViewModel.PropertyId != 0)
                {
                    existingSnagList.PropertyId = snagListViewModel.PropertyId;
                }
                existingSnagList.SnagListModified = DateTime.Now;
                if (await _snagListRepository.SaveChangesAsync() == true)
                {
                    return Ok(existingSnagList);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpDelete("DeleteSnagList/{SnagListId}")]
        public async Task<IActionResult> DeleteSnagList(int SnagListId)
        {
            try
            {
                var existingSnagList = await _snagListRepository.GetSnagListByID(SnagListId);
                if (existingSnagList == null)
                    return NotFound($"The SnagList does not exist");

                await _snagListRepository.DeleteSnagListAsync(SnagListId);
                return Ok(existingSnagList);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        // SnagListItem Actions

        [HttpGet("GetAllSnagListItems")]
        public async Task<IActionResult> GetAllSnagListItems()
        {
            try
            {
                var results = await _snagListRepository.GetAllSnagListItemsAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetSnagListItem/{SnagListItemId}")]
        public async Task<IActionResult> GetSnagListItem(int SnagListItemId)
        {
            try
            {
                var result = await _snagListRepository.GetSnagListItemByID(SnagListItemId);

                if (result == null)
                    return NotFound("SnagListItem does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpPost("AddSnagListItem")]
        public async Task<IActionResult> AddSnagListItem(SnagListItemViewModel snagListItemViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid input data");

            var snagListItem = new SnagListItem
            {
                SnagListItemDescription = snagListItemViewModel.SnagListItemDescription
            };

            try
            {
                await _snagListRepository.AddSnagListItem(snagListItem);
                return Ok(snagListItem);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut("EditSnagListItem/{SnagListItemId}")]
        public async Task<IActionResult> EditSnagListItem(int SnagListItemId, SnagListItemViewModel snagListItemViewModel)
        {
            try
            {
                var existingSnagListItem = await _snagListRepository.GetSnagListItemByID(SnagListItemId);
                if (existingSnagListItem == null)
                    return NotFound($"The SnagListItem does not exist");

                existingSnagListItem.SnagListItemDescription = snagListItemViewModel.SnagListItemDescription;
                await _snagListRepository.EditSnagListItem(SnagListItemId, existingSnagListItem.SnagListItemDescription);
                return Ok(existingSnagListItem);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete("DeleteSnagListItem/{SnagListItemId}")]
        public async Task<IActionResult> DeleteSnagListItem(int SnagListItemId)
        {
            try
            {
                var existingSnagListItem = await _snagListRepository.GetSnagListItemByID(SnagListItemId);
                if (existingSnagListItem == null)
                    return NotFound($"The SnagListItem does not exist");

                await _snagListRepository.DeleteSnagListItemAsync(existingSnagListItem);
                return Ok(existingSnagListItem);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        // SnagListItem Actions

        [HttpGet("GetAllSnagListItemLine")]
        public async Task<IActionResult> GetAllSnagListItemLineAsync(int SnagListId)
        {
            try
            {
                var results = await _snagListRepository.GetAllSnagListItemLineAsync(SnagListId);
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetSnagListItemLine/{SnagList},{item}")]
        public async Task<IActionResult> GetSnagListItemLineById(int SnagList, int item)
        {
            try
            {
                var result = await _snagListRepository.GetSnagListItemLineById(SnagList,item);

                if (result == null)
                    return NotFound("SnagListItem does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost("AddItem")]
        public async Task<IActionResult> AddItem(int snag, int list)
        {
            try
            {
                SnagListItemLine snagListItem= await _snagListRepository.AddItem( snag, list);
                return Ok(snagListItem);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete("DeleteSnagListItemLine/{SnagList},{item}")]
        public async Task<IActionResult> DeleteSnagListItemLineAsync(int SnagList, int item)
        {
            try
            {
                var existingSnagListItem = await _snagListRepository.GetSnagListItemLineById( SnagList, item);
                if (existingSnagListItem == null)
                    return NotFound($"The SnagListItem does not exist");

                await _snagListRepository.DeleteSnagListItemLineAsync(existingSnagListItem);
                return Ok(existingSnagListItem);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }*/
    }
}