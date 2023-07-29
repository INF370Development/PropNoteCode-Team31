using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models.Admin;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SnagListController : ControllerBase
    {
        private readonly ISnagListRepository _SnagListRepository;

        public SnagListController(ISnagListRepository snagListRepository)
        {
            _SnagListRepository = snagListRepository;
        }

        [HttpGet]
        [Route("GetAllSnagListItems")]
        public async Task<IActionResult> GetAllSnagListItems()
        {
            try
            {
                var results=await _SnagListRepository.GetAllSnagListItemsAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        [HttpGet]
        [Route("GetSnagListItem/{SnagListItemId}")]
        public async Task<IActionResult> GetSnagListItem(int SnagListItemId)
        {
            try
            {
                var result = await _SnagListRepository.GetSnagListItemByID(SnagListItemId);

                if (result == null) return NotFound("SnagListItem does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost]
        [Route("AddSnagListItem")]
        public async Task<IActionResult> AddSnagListItem(string cvm)
        {
            var SnagListItem = new SnagListItem { SnagListItemDescription = cvm };

            try
            {
                await _SnagListRepository.AddSnagListItem(SnagListItem);
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }

            return Ok(SnagListItem);
        }
        [HttpPut]
        [Route("EditSnagListItem/{SnagListItemId}")]
        public async Task<IActionResult> EditSnagListItem(int SnagListItemId, string SnagListIteDescription)
        {
            try
            {
                SnagListItem SnagListItem = (SnagListItem)await _SnagListRepository.GetSnagListItemByID(SnagListItemId);
                if (SnagListItem == null) return NotFound($"The SnagListItem does not exist");
                return Ok(await _SnagListRepository.EditSnagListItem(SnagListItemId, SnagListIteDescription));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
        [HttpDelete]
        [Route("DeleteSnagListItem/{SnagListItemId}")]
        public async Task<IActionResult> DeleteSnagListItem(int SnagListItemId)
        {
            try
            {
                var existingSnagListItem = await _SnagListRepository.GetSnagListItemByID(SnagListItemId);
                if (existingSnagListItem == null) return NotFound($"The SnagListItem does not exist");
                return Ok(await _SnagListRepository.DeleteSnagListItemAsync(existingSnagListItem));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpGet]
        [Route("GetAllSnagLists")]
        public async Task<IActionResult> GetAllSnagLists()
        {
            try
            {
                return Ok(await _SnagListRepository.GetAllSnagListsAsync());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        [HttpGet]
        [Route("GetSnagList/{SnagListId}")]
        public async Task<IActionResult> GetSnagList(int SnagListId)
        {
            try
            {
                var result = await _SnagListRepository.GetSnagListByID(SnagListId);

                if (result == null) return NotFound("SnagList does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpGet]
        [Route("CountSnagLists")]
        public async Task<IActionResult> CountSnagList()
        {
            try
            {
                var result = await _SnagListRepository.CountSnagList();

                if (result == null) return NotFound("SnagList does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpPost]
        [Route("AddSnagList")]
        public async Task<IActionResult> AddSnagList(int PropertyId)
        {
            try
            {
                await _SnagListRepository.CreateSnagList(PropertyId);
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }

            return Ok();
        }

        [HttpPut]
        [Route("EditSnagList/{SnagListId}")]
        public async Task<IActionResult> EditSnagList(int SnagListId, int PropertyId)
        {
            try
            {
                SnagList SnagList = (SnagList)await _SnagListRepository.GetSnagListByID(SnagListId);
                if (SnagList == null) return NotFound("The SnagListItem does not exist");
                return Ok(await _SnagListRepository.EditSnagList(SnagListId,PropertyId));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
        [HttpDelete]
        [Route("DeleteSnagList/{SnagListId}")]
        public async Task<IActionResult> DeleteSnagList(int SnagListId)
        {
            try
            {
                SnagList existingSnagList = await _SnagListRepository.GetSnagListByID(SnagListId);
                if (existingSnagList == null) return NotFound($"The SnagList does not exist");
                return Ok(await _SnagListRepository.DeleteSnagListAsync(SnagListId));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
        [HttpGet]
        [Route("GetSnagListItemLines/{SnagListId}")]
        public async Task<IActionResult> GetSnagListItemLines(int SnagListId)
        {
            if (SnagListId == 0) return NotFound("SnagList Invalid");
            try
            {
                var result = await _SnagListRepository.GetAllSnagListItemLineAsync(SnagListId);

                if (result == null) return NotFound("SnagList does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpGet]
        [Route("GetSnagListItemLineById/{SnagListId},{ItemId}")]
        public async Task<IActionResult> GetSnagListItemLineById(int SnagListId,int ItemId)
        {
            if (SnagListId == 0) return NotFound("SnagList Invalid");
            if (ItemId == 0) return NotFound("SnagList Invalid");
            try
            {
                var result = await _SnagListRepository.GetSnagListItemLineById(SnagListId,ItemId);

                if (result == null) return NotFound("SnagListItem does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpPost]
        [Route("AddSnagListItemLine")]
        public async Task<IActionResult> AddSnagListItemLine(int SnagListId, int SnagListItemId)
        {
            SnagListItemLine item = new SnagListItemLine { SnagListId = SnagListId, SnagListItemsId = SnagListItemId };
            try
            {
                await _SnagListRepository.AddItem(SnagListId, SnagListItemId);
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }
            return Ok(item);
        }
        [HttpDelete]
        [Route("DeleteSnagListItemLine/{SnagListId}")]
        public async Task<IActionResult> DeleteSnagListItemLine(int SnagListId,int ItemId)
        {
            try
            {
                SnagListItemLine existingSnagListItemsList = await _SnagListRepository.GetSnagListItemLineById(SnagListId, ItemId);
                if (existingSnagListItemsList == null) return NotFound($"The SnagListItem does not exist");
                return Ok(await _SnagListRepository.DeleteSnagListItemLineAsync(existingSnagListItemsList));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

    }
}
